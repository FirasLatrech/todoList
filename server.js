const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const dbName = "todos_db";
// THIS FOR TESTING PURPOSES ONLY
const uri =
    "mongodb+srv://firaslatrach:QQ61U0AakTtkhoa0@todoapp.rh1t3.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

connectToDatabase();

const statuses = ["open", "in progress", "completed", "archived", "cancelled"];

const generateRandomTodo = () => {
    const randomName = `Task ${Math.floor(Math.random() * 1000)}`;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return {
        name: randomName,
        status: randomStatus,
        color: randomColor,
        createdAt: new Date(),
    };
};

app.post("/todos", async (req, res) => {
    const { name, status, color } = req.body;
    if (!name || !color) {
        return res.status(400).json({
            error: "Invalid request. Please provide name and color",
        });
    }

    const newStatus = status ? status.toLowerCase() : "open";
    if (status && !statuses.includes(newStatus)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    const newTodo = {
        name,
        status: newStatus,
        color,
        createdAt: new Date(),
    };

    try {
        const result = await db.collection("todos").insertOne(newTodo);
        res.status(201).json({ ...newTodo, _id: result.insertedId });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            error: "An error occurred while creating the todo",
        });
    }
});

app.get("/todos", async (req, res) => {
    let { page = 1, limit = 10, status, search, sort = "desc" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (
        status &&
        status.toLowerCase() !== "null" &&
        status.toLowerCase() !== "undefined"
    ) {
        query.status = status.toLowerCase();
    }

    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    try {
        const total = await db.collection("todos").countDocuments(query);
        const todos = await db
            .collection("todos")
            .find(query)
            .sort({ createdAt: sort === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const statusCount = await db
            .collection("todos")
            .aggregate([
                { $match: query },
                { $group: { _id: "$status", count: { $sum: 1 } } },
            ])
            .toArray();

        const statusCountObject = statusCount.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        res.json({
            total,
            page,
            limit,
            todos,
            statusCount: statusCountObject,
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            error: "An error occurred while fetching todos",
        });
    }
});

app.get("/todos/:id", async (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = await db
            .collection("todos")
            .findOne({ _id: new ObjectId(todoId) });

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({
            error: "An error occurred while fetching the todo",
        });
    }
});

app.put("/todos/:id", async (req, res) => {
    const todoId = req.params.id;
    const { name, status, color } = req.body;

    if (status && !statuses.includes(status.toLowerCase())) {
        return res.status(400).json({ error: "Invalid status" });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (status) updateFields.status = status.toLowerCase();
    if (color) updateFields.color = color;

    try {
        const result = await db
            .collection("todos")
            .findOneAndUpdate(
                { _id: new ObjectId(todoId) },
                { $set: updateFields },
                { returnDocument: "after" }
            );

        if (!result) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            error: "An error occurred while updating the todo",
        });
    }
});

app.delete("/todos/:id", async (req, res) => {
    const todoId = req.params.id;

    try {
        const result = await db
            .collection("todos")
            .deleteOne({ _id: new ObjectId(todoId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            error: "An error occurred while deleting the todo",
        });
    }
});

app.post("/createMany", async (req, res) => {
    const { count } = req.body;

    if (!count || isNaN(count) || count <= 0) {
        return res.status(400).json({
            error: "Invalid count. Please provide a positive number.",
        });
    }

    const batchSize = 1000;
    const batches = Math.ceil(count / batchSize);

    try {
        let totalInserted = 0;
        for (let i = 0; i < batches; i++) {
            const batchCount = Math.min(batchSize, count - i * batchSize);
            const newTodos = Array.from(
                { length: batchCount },
                generateRandomTodo
            );
            const result = await db.collection("todos").insertMany(newTodos);
            totalInserted += result.insertedCount;
        }

        res.status(201).json({
            message: `${totalInserted} todos created successfully`,
        });
    } catch (error) {
        console.error("Error creating todos:", error);
        res.status(500).json({
            error: "An error occurred while creating todos",
        });
    }
});

app.post("/deleteMany", async (req, res) => {
    const { count } = req.body;

    if (!count || isNaN(count) || count <= 0) {
        return res.status(400).json({
            error: "Invalid count. Please provide a positive number.",
        });
    }

    try {
        // Get the total number of todos
        const totalTodos = await db.collection("todos").countDocuments();

        // Determine how many todos to delete (minimum of count and totalTodos)
        const deleteCount = Math.min(count, totalTodos);

        // Fetch random todos to delete
        const todosToDelete = await db
            .collection("todos")
            .aggregate([
                { $sample: { size: deleteCount } },
                { $project: { _id: 1 } },
            ])
            .toArray();

        const idsToDelete = todosToDelete.map((todo) => todo._id);

        // Delete the selected todos
        const result = await db
            .collection("todos")
            .deleteMany({ _id: { $in: idsToDelete } });

        res.json({
            message: `${result.deletedCount} todos deleted successfully`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting todos:", error);
        res.status(500).json({
            error: "An error occurred while deleting todos",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

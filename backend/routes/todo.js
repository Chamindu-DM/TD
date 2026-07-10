import { Router } from "express";
import pool from "../db.js";

const router = Router();

//creating a new task
router.post("/todo", async(req,res) => {
    try {
        const {description, completed} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description, completed) VALUES ($1, $2) RETURNING *",
            [description, completed || false]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// show all tasks
router.get("/all", async(req,res) =>{
    try {
        const allTodo = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodo.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Can't fetch data from db");
    }
});

// view a single task
router.get("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const viewTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1",
            [id]
        );
        res.json(viewTodo.rows[0])

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// update a todo
router.put("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const {description, completed} = req.body;
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1, completed = $2 WHERE todo_id=$3 RETURNING *",
            [description, completed, id]
        );
        res.json(updatedTodo.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// delete a task
router.delete("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTask = await pool.query(
            "DELETE FROM todo WHERE todo_id= $1 RETURNING *",
            [id]
        );

        res.json(deleteTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;

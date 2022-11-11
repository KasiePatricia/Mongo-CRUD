const Task = require('../model/Task');

//get all tasks
exports.getTasks = async (req, res) => {
    try {
        let tasks = await Task.find();
        if(tasks.length === 0)
        return res.status(404).json({
            success: false,
            message: "No Task were found"
        })
        res.status(200).json({
            success: true,
            message: "Task found",
            tasks,
            count: tasks.length,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//get single task
exports.getTask = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let task = await Task.findOne(id);
        if(!task) return res.status(404).json ({
            success: false,
            message: "Task not found",
        })
        res.status(200).json({
            success: true,
            message: "Task found",
            task
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//create task
exports.createTask = async (req, res) => {
    try {
        let task = await req.body;
        let created = await Task.create(task);
        if(!created) return res.status(404).json ({
            success: false,
            message: "Task creation failed",
        });
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//update task 
exports.updateTask = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let task = await req.body;
        let update = await Task.findOneAndUpdate(id, task, {new: true});
        if(!update) return res.status(404).json ({
            success: false,
            message: "Task not updated",
        });
        return res.status(200).json({
            success: true,
            message: "Task updated",
            task: update
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//delete task
exports.deleteTask = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let deleted = await Task.findOneAndRemove(id);
        if(!deleted) return res.status(404).json ({
            success: false,
            message: "Task not deleted",
        });
        return res.status(200).json({
            success: true,
            message: "Task delected"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
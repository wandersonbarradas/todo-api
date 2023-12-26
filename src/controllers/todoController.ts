import { Request, Response } from "express";
import { Todo } from "../models/Todo";

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({ list });
};

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {
        const newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false,
        });
        res.status(201);
        res.json({ item: newTodo });
    } else {
        res.json({ error: "Dados não enviados" });
    }
};

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const todo = await Todo.findByPk(id);
    if (todo) {
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case "true":
                case "1":
                    todo.done = true;
                    break;
                case "false":
                case "0":
                    todo.done = false;
                    break;
            }
        }
        await todo.save();
        res.json({ item: todo });
    } else {
        res.json({ error: "Tarefa não encontrada!" });
    }
};

export const remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    let todo = await Todo.findByPk(id);
    if (todo) {
        await todo.destroy();
        res.json({ message: "Tarefa excluida com sucesso!" });
    } else {
        res.json({ error: "Tarefa não encontrada!" });
    }
};

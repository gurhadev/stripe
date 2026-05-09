import { useGetTodoQuery } from "../context/apiSlice"

export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export default function About() {
    const { data: todos, isLoading,isError} = useGetTodoQuery();
    if(isLoading) return <p>Loading....</p>
    if(isError) return <p className="text-rose-600">Somthing went wrong,please try again?</p>

    return (
        <ul className="grid gap-4 grid-cols-4 p-4">
            {todos && todos.map((todo : Todo) => (
                <li className="text-gurha bg-gurha p-2 h-20 rounded-md shadow" key={todo?.id}><strong>{todo?.id} :-</strong> {todo?.title}</li>
            ))}
        </ul>
    )
};
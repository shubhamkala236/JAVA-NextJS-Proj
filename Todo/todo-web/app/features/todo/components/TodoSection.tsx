import TodoBoard from "@/app/features/todo/components/TodoBoard";
import { listTodos } from "@/app/features/todo/queries";

/**
 * The async Server Component inside the page's <Suspense> boundary — this is
 * what streams in once the API responds. It hands TodoBoard a plain array
 * rather than an unresolved promise, so that every refresh() re-renders the
 * board instead of re-suspending it (which would drop the filter/search state).
 */
const TodoSection = async () => {
  const todos = await listTodos();

  return <TodoBoard todos={todos} />;
};

export default TodoSection;

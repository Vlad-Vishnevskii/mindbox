import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from './App';

test('Добавление новой задачи', () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Add task");
  const button = screen.getByLabelText("Добавить");

  fireEvent.change(input, { target: { value: "Купить молоко" } });
  fireEvent.click(button);

  expect(screen.getByText("Купить молоко")).toBeInTheDocument();
});

test("Удаление задачи", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Add task");
  const addButton = screen.getByRole("button", { name: /добавить/i });

  fireEvent.change(input, { target: { value: "Купить хлеб" } });
  fireEvent.click(addButton);

  const taskItem = screen.getByText("Купить хлеб");
  expect(taskItem).toBeInTheDocument();

  const deleteButton = taskItem.closest('[data-card="item"]')?.querySelector('[aria-label="Удалить задачу"]')


  if (deleteButton) {
    fireEvent.click(deleteButton);
  }

  await waitFor(() => {
    expect(screen.queryByText("Купить хлеб")).not.toBeInTheDocument();
  });
});

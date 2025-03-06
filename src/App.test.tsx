import React from 'react';
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

  // Добавляем задачу
  const input = screen.getByPlaceholderText("Add task");
  const addButton = screen.getByRole("button", { name: /добавить/i });

  fireEvent.change(input, { target: { value: "Купить хлеб" } });
  fireEvent.click(addButton);

  // Проверяем, что задача добавилась
  const taskItem = screen.getByText("Купить хлеб");
  expect(taskItem).toBeInTheDocument();

  // Находим кнопку удаления внутри той же карточки
  const deleteButton = taskItem.closest('[data-card="item"]')?.querySelector('[aria-label="Удалить задачу"]') // Используем closest, чтобы найти кнопку в родительском элементе

  // Удаляем задачу
  if (deleteButton) {
    fireEvent.click(deleteButton);
  }

  // Явно ждём удаления задачи
  await waitFor(() => {
    expect(screen.queryByText("Купить хлеб")).not.toBeInTheDocument(); // Используем queryByText для отсутствия элемента
  });
});

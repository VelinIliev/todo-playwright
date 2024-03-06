const { test, expect } = require('@playwright/test');

test('user can add a task', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task')
});

test('user can delete a task', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const tasks = await page.$$eval('.task', 
        tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task')
});

test('user can mark a task as complete', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const completedTasks = await page.$('.task.completed');
    expect(completedTasks).not.toBeNull()
});

test('user can filter tasks', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');
    const incompleteTasks = await page.$('.task:not(.completed)');
    expect(incompleteTasks).toBeNull()
});

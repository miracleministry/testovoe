<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Задача</th>
                <th>Готовность</th>
            </tr>
        </thead>
        <tbody>
            <tr class="task" v-for="task in tasks">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>
                    <input v-if="task.done" type="checkbox" name="" id="" checked>
                    <input v-else="task.done" type="checkbox" name="" id="">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    data() {
        return {
            tasks: [
                { "id": 1, "title": "Задача 1", "done": false },
                { "id": 2, "title": "Задача 2", "done": false },
                { "id": 3, "title": "Задача 3", "done": false },
                { "id": 4, "title": "Задача 4", "done": false },
                { "id": 5, "title": "Задача 5", "done": false }
            ]
        }
    },
    methods: {

    }
}
</script>

<style></style>
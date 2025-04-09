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
                    <input v-if="task.done" @click="switchDone(task.id)" type="checkbox" name="" id="" checked>
                    <input v-else="task.done" @click="switchDone(task.id)" type="checkbox" name="" id="">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tasks: null
        }
    },
    methods: {
        switchDone(taskId) {
            const found = this.tasks.find((element) => element.id == taskId);
            found.done = !found.done
            this.saveTasks()
        },
        async getTasks() {
            try {
                Response = await axios.get('/json');
                this.tasks = Response.data
            } catch (e) {
                alert("Error")
            }
        },
        async saveTasks() {
            try {
                await axios.post('/savejson', this.tasks);
            } catch (e) {
                alert("Error")
            }
        }
    },
    mounted() {
        this.getTasks()
    }
}
</script>

<style></style>
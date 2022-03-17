import axios from "axios";
const backEndUBaseUrl = "http://127.0.0.1:8000/api/";
const api = axios.create({
  timeout: 7000,
  baseURL: backEndUBaseUrl,
});

export async function createTask(data: NewTask) {
  try {
    let request = await api.post(backEndUBaseUrl + "tasks", {
      title: data.title,
      note: data.note,
      date: data.date,
      time: data.time,
    });
    if (request) {
      return request.data;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export async function getTasks() {
  return tasksFakeData;
  try {
    let request = await api.get(backEndUBaseUrl + "tasks");
    if (request) {
      return request.data;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export async function deleteTask(id: Number) {
  try {
    let request = await api.delete(backEndUBaseUrl + "tasks/" + id);
    if (request) {
      return request.data;
    }
    return false;
  } catch (err) {
    return false;
  }
}

const tasksFakeData = [
  {
    id: 1,
    title: "Buscar cachorro na padaria",
    note: "Tenho que buscar o cachorro na padaria para ele não se atrasar para escola",
    date: "2022/10/12",
    time: "14:00",
    status: 1,
  },
  {
    id: 2,
    title: "Pegar roupa na lavanderia",
    note: "Levar roupas para lavar",
    date: "2022/10/12",
    time: "11:00",
    status: 0,
  },
  {
    id: 3,
    title: "Pegar lapis na papelaria",
    note: "Comprar também caneta",
    date: "2022/10/11",
    time: "21:00",
    status: 0,
  },
  {
    id: 4,
    title: "Pegar copo de cafe",
    note: "Tenho que buscar o cachorro na padaria para ele não se atrasar para escola",
    date: "2021/10/12",
    time: "12:00",
    status: 1,
  },
];

interface NewTask {
  title: String;
  note: String;
  date: String;
  time: String;
}

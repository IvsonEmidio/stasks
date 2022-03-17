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
    title: "Catch dog on petshop",
    note: "I need to remember to take water to her",
    date: "2022/10/12",
    time: "14:00",
    status: 1,
  },
  {
    id: 2,
    title: "Buy new shoes",
    note: "it's need to be black",
    date: "2022/10/12",
    time: "11:00",
    status: 0,
  },
  {
    id: 3,
    title: "Fix my linux installation",
    note: "Maybe i need to install other distro",
    date: "2022/10/11",
    time: "21:00",
    status: 0,
  },
  {
    id: 4,
    title: "Download Averange Sevenfold albuns",
    note: "Can i use 4shared??",
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

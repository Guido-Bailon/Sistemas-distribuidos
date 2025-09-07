const axios = require("axios")

async function fetchUsers() {
    let users = await axios.get("https://jsonplaceholder.typicode.com/users");
    return users.data; 
}

async function fetchPost(ID) {
    let posts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${ID}`);
    return posts.data;
}

const sequential = async (n) => {
    let users = await fetchUsers();
    console.log(`---SECUENCIAL---`);
    for (var i =0; i<n; i++){
        let posts = await fetchPost(users[i].id);
        console.log(`Usuario: ${users[i].name} tiene ${posts.length} publicaciones`);
    }
}

const parallel = async (n) => {
    let users = await fetchUsers();
    console.log(`---PARALELO---`);
    let promises = [];
    for (var i=0; i<n; i++){
        promises.push(fetchPost(users[i].id));
    }
    let res = await Promise.all(promises);
    for (var i=0; i<n; i++){
        console.log(`Usuario: ${users[i].name} tiene ${res[i].length} publicaciones`);
    }
}

const main = async () => {
    console.time("Secuencial");
    await sequential(3);
    console.timeEnd("Secuencial");
    console.time("Paralelo");
    await parallel(3);
    console.timeEnd("Paralelo");
}

main()
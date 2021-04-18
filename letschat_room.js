var firebaseConfig = {
      apiKey: "AIzaSyBjCECCzwbpcjO89qObA9KMD4OGcS7Ji-s",
      databaseURL: "https://kwitter-c6d4c-default-rtdb.firebaseio.com",
      authDomain: "kwitter-c6d4c.firebaseapp.com",
      projectId: "kwitter-c6d4c",
      storageBucket: "kwitter-c6d4c.appspot.com",
      messagingSenderId: "351770282335",
      appId: "1:351770282335:web:e7b988a878ac16df3eceea"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "letschat_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_name = childKey;
            console.log("Roomname-"+Room_name);
            row="<div class='room_name' id="+Room_name+" onclick='redirectToRoomName(this.id)' >#"+Room_name+"</div><hr>";
            document.getElementById("output").innerHTML+=row; 
            });
      });
}
getData();
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="letschat_page.html";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
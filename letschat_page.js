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
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            uname: user_name,
            message: msg,
            like: 0
      })
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log( message_data);
                        uname = message_data['uname'];
                        message = message_data['message'];
                        like = message_data['like'];
                        console.log(message);
                        name_with_tag = "<h4> " + uname + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'> " + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        console.log(row);
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}

getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
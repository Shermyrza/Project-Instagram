let API = "http://localhost:8000/posts";
let API_COMMENTS = "http://localhost:8000/comments";

let empty = document.querySelector("#emptyHeart");
let filled = document.querySelector("#filledHeart");
let before = document.querySelector("#saveBefore");
let after = document.querySelector("#saveAfter");
let comentBtn = document.querySelector(".send-comm");
let commentImp = document.querySelector("#commentImp");
let commentRoot = document.querySelector(".comments");
let likes = document.querySelector("#likes");
let likesCount = 0;
let postImg = document.querySelector(".post-img");
let whiteHeart = document.querySelector("#white-heart");

likes.innerHTML = `${likesCount} отметок "Нравится"`;

empty.addEventListener("click", () => {
  empty.style.display = "none";
  filled.style.display = "block";
  likesCount += 1;
  likes.innerHTML = `${likesCount} отметок "Нравится"`;
});

filled.addEventListener("click", () => {
  filled.style.display = "none";
  empty.style.display = "block";
  likesCount -= 1;

  likes.innerHTML = `${likesCount} отметок "Нравится"`;
});
before.addEventListener("click", () => {
  before.style.display = "none";
  after.style.display = "block";
});
after.addEventListener("click", () => {
  after.style.display = "none";
  before.style.display = "block";
});

postImg.addEventListener("dblclick", () => {
  empty.style.display = "none";
  filled.style.display = "block";
  likesCount += 1;
  likes.innerHTML = `${likesCount} отметок "Нравится"`;
  whiteHeart.style.opacity = "1";
  setTimeout(() => {
    whiteHeart.style.opacity = "0";
  }, 1000);
});

const creatComment = (val) => {
  let div = document.createElement("div");
  div.innerText = val;
  commentRoot.prepend(div);
  commentImp.value = "";
};

comentBtn.addEventListener("click", () => {
  if (!commentImp.value.trim()) {
    return;
  }
  let obj = {
    title: commentImp.value,
  };
  fetch(`${API_COMMENTS}/`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      creatComment(commentImp.value);
    })
    .catch((err) => {
      console.log(err, "ERROR");
    });
});

const getComment = () => {
  fetch(`${API_COMMENTS}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => {
        creatComment(item.title);
      });
    })
    .catch((err) => {
      console.log(err, "ERROR");
    });
};

getComment();

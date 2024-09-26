let flag = false;

function mode(themeChanger) {
  if (!flag) {
    document.querySelector(".theme .dark-light").name = "sunny-outline";
    themeChanger.lastChild.innerText = "Light Mode";
    document.body.classList.add("dark");
    flag = true;
  } else {
    document.querySelector(".theme .dark-light").name = "moon-outline";
    themeChanger.lastChild.innerText = "Dark Mode";
    document.body.classList.remove("dark");
    flag = false;
  }
}

export default mode;

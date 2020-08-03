const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const sideActive = () => {
  removePasive();
  header.classList.add("side-active");
  main.classList.add("side-active");
  footer.classList.add("side-active");
};
const sidePasive = () => {
  removeActive();
  pasiveActive();
};
const removeActive = () => {
  header.classList.remove("side-active");
  main.classList.remove("side-active");
  footer.classList.remove("side-active");
};
const removePasive = () => {
  header.classList.remove("side-pasive");
  main.classList.remove("side-pasive");
  footer.classList.remove("side-pasive");
};

const pasiveActive = () => {
  header.classList.add("side-pasive");
  main.classList.add("side-pasive");
  footer.classList.add("side-pasive");
};

export { sideActive, sidePasive };

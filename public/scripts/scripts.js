import { sideActive, sidePasive } from "./side.js";
document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
  const sidenav = document.querySelectorAll(".sidenav");

  M.Sidenav.init(sidenav, {
    onOpenStart: sideActive,
    onCloseStart: sidePasive,
  });
  // const refreshData = async () => {
  //   const allData = await axios.get("/all-data");
  //   console.log(allData);
  // };
  // refreshData();
  // form submited
  document
    .querySelector("#form-upload")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const file = document.querySelector("#file").files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        // upload file
        uploads(formdata);
      } catch (error) {}
    });
  const hideElement = () => {
    document.querySelector("#label-progress").innerHTML = `progress : `;
    progress.classList.add("hide");
    document.querySelector("#file").value = null;
    document.querySelector(".nama-file").value = "";
  };
  const uploads = async (files) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        document.querySelector(
          "#label-progress"
        ).innerHTML = `progress : ${percentCompleted}%`;
        const progress = document.querySelector("#progress");
        const progressWidth = document.querySelector("#progress-width");
        progress.classList.remove("hide");
        progressWidth.style.width = `${percentCompleted}%`;
      },
    };
    try {
      const { data } = await axios.post("/action", files, config);
      hideElement();
      // status success
      if (data.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      hideElement();
      const {
        response: { data },
      } = error;
      // status 411
      if (data.status === 411) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // status 500
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Network Error`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
});

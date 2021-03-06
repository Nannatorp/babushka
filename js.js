const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

const section = document.querySelector("section");
const template = document.querySelector("template").content;

let filter = "alle";
let data;
const h1 = document.querySelector("h1");
// const modal = document.querySelector("#modal");

const filterKnapper = document.querySelectorAll("nav button");
console.log(filterKnapper);
filterKnapper.forEach((knap) => knap.addEventListener("click", filterMadden));

function filterMadden() {
  filter = this.dataset.kategori;

  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  vis(data);

  h1.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();
  data = json;
  vis(data);
}

function vis(json) {
  console.log(json);

  section.textContent = "";

  json.forEach((mad) => {
    if (filter == mad.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = mad.navn;
      klon.querySelector(".info").textContent = mad.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + mad.pris + ",-";
      klon.querySelector("img").src = "img/" + mad.billednavn + "-md.jpg";

      klon.querySelector("article").addEventListener("click", () => {
        location.href = `singleview.html?id=${mad._id}`;
      }); //sender til en anden side

      //   klon
      //     .querySelector("article")
      //     .addEventListener("click", () => visDetaljer(mad));

      section.appendChild(klon);
    }
  });
}

// function visDetaljer(mad) {
//   console.log(mad);

//   modal.style.display = "block";

//   modal.querySelector("h2").textContent = mad.navn;
//   modal.querySelector(".info").textContent = mad.kortbeskrivelse;
//   modal.querySelector(".info_2").textContent = mad.langbeskrivelse;
//   modal.querySelector(".info_3").textContent =
//     "Oprindelsesregion: " + mad.oprindelsesregion;
//   modal.querySelector(".pris").textContent = "Pris: " + mad.pris + ",-";
//   modal.querySelector("img").src = "img/" + mad.billednavn + "-md.jpg";
// }

// modal.addEventListener("click", () => (modal.style.display = "none"));

hentData();

//burger menu

const btn = document.querySelector(".toggle-btn");
const nav = document.querySelector(".navi");

function toggleMenu() {
  // Toggle en klasse p?? nav vha. classList.toggle
  // Toggle en klasse, der hedder "shown"
  nav.classList.toggle("shown");
  // variabel, der hedder menuShown
  // Den viser at nav-variablen indeholder klassen "shown" vha. classList.contains("")
  const menuShown = nav.classList.contains("shown");

  if (menuShown) {
    // hvis nav har klassen "shown", er btn.textContent "Luk"
    btn.textContent = "Luk";
  } else {
    // hvis IKKE nav har klassen "shown", er btn.textContent "Menu"
    btn.textContent = "???";
  }
}

// klik-event til btn, der s??tter toggleMenu-funktionen i gang
btn.addEventListener("click", toggleMenu);

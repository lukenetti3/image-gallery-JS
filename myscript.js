const imageContainer = document.getElementById("image-container")

let globalCnt = 1
let globalCategory = "nature"
setCategory(globalCategory, globalCnt)

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (clientHeight + scrollTop >= scrollHeight - 300) {
    globalCnt += 1
    getData(globalCategory, globalCnt)
  }
})

async function getData(category, pageCnt) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${category}&per_page=10&page=${pageCnt}&client_id=QfrfVYchmGs3hjUsHvKM7VC565jptx15oIelIamQseg`
  )
  if (response.ok) {
    const images = await response.json()
    images.results.map((url) => {
      let divEl = document.createElement("div")
      let imgEl = document.createElement("img")
      imgEl.setAttribute("id", "img-id")
      imgEl.addEventListener("click", () =>
        openModal(event, url.height, url.width)
      )
      imgEl.src = url.urls.regular
      if (url.width > url.height) {
        divEl.classList.add("landscape")
      } else {
        divEl.classList.add("portrait")
      }
      imageContainer.appendChild(divEl)
      divEl.appendChild(imgEl)
    })
  }
}

function openModal(event, height, width) {
  const modal = document.getElementById("modal")
  modal.style.display = "block"
  imageEl = document.createElement("img")
  modal.appendChild(imageEl)
  imageEl.setAttribute("id", "modal-img")
  if (width > height) {
    imageEl.setAttribute("class", "modal-landscape")
  } else {
    imageEl.setAttribute("class", "modal-portrait")
  }
  imageEl.src = event.target.src
}

function closeModal() {
  document.getElementById("modal-img").remove()
  modal.style.display = "none"
}

function setCategory(category, pageCnt) {
  globalCnt = pageCnt
  globalCategory = category
  clearImages()
  getData(globalCategory, globalCnt)
}

function clearImages() {
  imageContainer.querySelectorAll("*").forEach((img) => img.remove())
}

function changeView() {
  if (document.getElementsByClassName("grid-container").length > 0) {
    imageContainer.classList.remove("grid-container")
    imageContainer.classList.add("list-container")
  } else {
    imageContainer.classList.add("grid-container")
    imageContainer.classList.remove("list-container")
  }
}

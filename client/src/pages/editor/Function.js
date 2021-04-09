const functions = [

]
const getCoordinates = (e) => {
    let canvas = editorRef.current
    let x = e.pageX,
        y = e.pageY
    console.log(`${x - canvas.offsetLeft}:${y - canvas.offsetTop}`)
}
export default Function;
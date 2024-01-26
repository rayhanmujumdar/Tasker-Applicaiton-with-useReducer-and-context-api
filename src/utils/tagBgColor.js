export default function tagBgColor(){
    const bgColor = ['#00D991A1', '#1C92FFB0', '#FE1A1AB5', '#BD560BB2']
    const randomSelectedColor = Math.floor(Math.random() * bgColor.length)
    return bgColor[randomSelectedColor]
}
import SchoolCard from "../components/schoolCard"
import shiratorizawaImg from "../assets/yu.jpg";

const School = () => {
  return (
    <div className="mt-30">
        <SchoolCard className="mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
        <SchoolCard className="flex-row-reverse mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
        <SchoolCard className="mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
        <SchoolCard className="flex-row-reverse mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
        <SchoolCard className="mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
        <SchoolCard className="flex-row-reverse mt-10" link={"https://www.pinterest.com/pin/19351473394291160/"} name="Shiratorizawa Uni" location="Japan Osaka" image={shiratorizawaImg}/>
    </div>
  )
}

export default School
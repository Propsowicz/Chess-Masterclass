import React, {useContext, useState, useEffect} from 'react'
import {
  useParams,
  useNavigate
} from 'react-router-dom'
import StudyBody from '../../components/manage studies/singleStudy/StudyBody'
import StudyHeader from '../../components/manage studies/singleStudy/StudyHeader'
import {UserContext} from '../../context/UserContext'
import StudyChessTable from '../../components/manage studies/singleStudy/StudyChessTable'
import CreateStudyTable from '../../components/manage studies/singleStudy/CreateStudyTable'
import StudyManagment from '../../components/manage studies/singleStudy/StudyManagment'
import {checkIfUserisAuthorFunction} from '../../utils/utlis'
import {url} from '../../constants/urlAPI'

const Study = () => {
  let navigate = useNavigate()
  let {userInfo} = useContext(UserContext)
  
  // CHECK IF USER IS AUTHOR -- start
  let [checkIfUserisAuthor, setCheckIfUiS] = useState()
  // CHECK IF USER IS AUTHOR -- end

  // GET STUDY DATA -- start
  let [studyData, setStudyData] = useState([])
  let author = useParams().author
  let id = useParams().id

  let getStudy = async () => {
    let response = await fetch(`${url}/api/study/detail/${author}/${id}`)
    let data = await response.json()
    setStudyData(data)  

    // fucntion to send hook with info if logged user is author of study (so eventually he can edit it)
    if(userInfo.username === studyData.username){
      setCheckIfUiS(true)
    }else{
      setCheckIfUiS(false)
    }     

    // get numbers of study likes
    if(data.followers.indexOf(userInfo.user_id) === -1){        
      setIsLikedByUser(false)
    }else{
      setIsLikedByUser(true)
    }

    // check user permisson - if study is private only author have access to display it
    if(!checkIfUserisAuthorFunction(userInfo, data)){
      navigate('/login')
    }
  }
  // GET STUDY DATA -- end

  // GET STUDY TABLES DATA -- start
  let [studyTables, setStudyTables] = useState([])

  let getTables = async () => {
    let response = await fetch(`${url}/api/study/detail/${author}/${id}/table`)
    let data = await response.json()
    setStudyTables(data)
  }
  // GET STUDY TABLES DAT -- end

  // LIKE STUDY -- start
    // check if study is liked by user -- start
  let [isLikedByUser, setIsLikedByUser] = useState(false)  
    // check if study is liked by user -- end

  let likeStudy = async () => {
    let response = await fetch(`${url}/api/study/detail/${author}/${id}/table/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                'method': 'LIKE',
                'user': userInfo.username,
            }
        )
    })
    setIsLikedByUser(!isLikedByUser)
  }
  // LIKE STUDY -- end


  useEffect(() => {
    getStudy()
    getTables()
  }, [isLikedByUser, checkIfUserisAuthor])

  return (
    <div>
        <StudyManagment privacy={studyData.private} id={id} author={studyData.username} isLogged={checkIfUserisAuthor}/>
        <StudyHeader name={studyData.name} author={studyData.username} likes={studyData.number_of_likes} handleOnClick={likeStudy} isLogged={checkIfUserisAuthor} id={id} user={userInfo.username} isLiked={isLikedByUser}/>
        <StudyBody body={studyData.body} isLogged={checkIfUserisAuthor} author={studyData.username} id={id}/>
        {studyTables.map((table, index) => (
            <StudyChessTable key={index} text={table.text} tableId={table.id} coord={table.coord} author={studyData.username} id={id} isLogged={checkIfUserisAuthor} />
        ))}
        <CreateStudyTable author={studyData.username} id={id} isLogged={checkIfUserisAuthor}/>
    </div>
  )
}

export default Study
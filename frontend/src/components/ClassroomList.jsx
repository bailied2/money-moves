import "./styles/CardList.css";
import ClassCard from "./ClassCard";

const ClassroomList = ({ is_teacher, classrooms }) => {
    const listItems = classrooms.map(classroom => {
        <ClassCard 
            is_teacher={is_teacher} 
            title={classroom.title} 
            num_students={classroom.num_students}
            start_date={classroom.start_date}
            end_date={classroom.end_date}
        />
    });
    return (
        <div className="card_list_wrapper">
            {listItems}
        </div>
    );
};

export default ClassroomList;
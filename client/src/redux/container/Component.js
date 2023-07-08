import { connect } from 'react-redux'
import Show from "../../component/Show";
import  {item}  from '../action/action';

const mapStateToProps=state=>{

};
const mapDispatchToProps=dispatch=>({
    itemHandler:data=>dispatch(item(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Show)




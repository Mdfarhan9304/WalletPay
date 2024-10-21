
import { useNavigate } from "react-router-dom"
import Modal from './Modal'

export const Appbar = () => {
const nav=useNavigate()
    return <div className="bg-[#1976d2] inset-0 flex justify-between items-center  bg-opacity-30 backdrop-blur-lg border border-opacity-20 sticky z-50 top-0 py-2">
        <div className="flex flex-col justify-center h-full ml-4">
        <div className="text-[#1976d2] font-bold font-poppins uppercase text-xl">WalletPay</div>
        </div>
        <div className="flex">
           
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                👨🏻‍💼
                </div>
            </div>
            {/* <button className="bg-white rounded-lg px-2 py-1 my-1" onClick={()=> nav("/")}>Logout</button> */}
            <Modal />
        </div>
    </div>
}
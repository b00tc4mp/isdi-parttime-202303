export default function ChildrenChart({ child }) {
    return (
        <section className="w-[90%]bg-blue-200 flex ml-3 mr-5 mb-2 p-3 rounded-[7px] flex flex-col items-center overflow-auto">
            {/* 
            <div className="w-[200px] p-2 bg-slate-50 flex flex-col ml-2 mb-2 border border-black p-3 rounded-[7px] shadow-md">
                <div className="pl-2 text-3xl text-center overflow-auto">
                    <img src="https://picsum.photos/id/201/200/" className="rounded-[50px] mt-2 mb-1" width="60px" /> {child.value} </div>
            </div> */}




            <div className="w-[200px] flex flex-wrap gap-2 text-xs">
                {child.value && (child.value._id) ? (
                    <div key={child.value._id} className="w-[200px] p-2 bg-slate-50 flex flex-col ml-2 mb-2 p-3 rounded-[7px] shadow-md ml-auto mr-auto">
                        <div className="flex">
                            <div>
                                <img src={child.value.avatar} alt="" className="rounded-[50%] mb-1" width="120px" />
                            </div>
                            <div className="w-[210px] h-[10px] mt-[10px] ml-3 ">
                                <p className="">{child.value.department} </p>
                                <p className="">{child.value.jobPosition}</p>
                                <p className="">{child.value.centerAttached} </p>
                            </div>
                        </div>
                        <p className="pt-3 font-bold">{child.value.name} {child.value.firstSurname} {child.value.secondSurname}</p>
                    </div>
                ) : (
                    <div className="w-[200px] ml-auto mr-auto p-2 bg-slate-50 border border-slate- flex flex-col ml-2 mb-4 p-3 rounded-[7px] shadow-md">
                        <div className="flex items-center">
                            <div>
                                <img src="https://picsum.photos/id/201/200/" alt="" className="rounded-[50%] mb-1" width="120px" />
                            </div>
                            <div className="w-[210px] h-[78px] mt-[5px] ml-3 ">
                                <p className="text-xl font-bold">{child.value} </p>
                                <p className="mt-1">Department</p>
                                <p className="">Barcelona </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="w-[900px] ml-11 flex flex-wrap gap-2 text-xs">
                <div className="w-full flex flex-wrap gap-2">
                    {child.children && (child.children).length > 0 && child.children.map((children) => {
                        return (
                            <div key={children.value._id} className="w-[200px] p-2 bg-slate-50 flex flex-col ml-2 mb-2 p-3 rounded-[7px] shadow-md">
                                <div className="flex">
                                    <div>
                                        <img src={children.value.avatar} alt="" className="rounded-[50%] mb-1" width="120px" />
                                    </div>
                                    <div className="w-[210px] h-[10px] mt-[10px] ml-3 ">
                                        <p className="">{children.value.department} </p>
                                        <p className="">{children.value.jobPosition}</p>
                                        <p className="">{children.value.centerAttached} </p>
                                    </div>
                                </div>
                                <p className="pt-3 font-bold">{children.value.name} {children.value.firstSurname} {children.value.secondSurname}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </section>
    )
}
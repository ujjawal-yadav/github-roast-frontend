import React, { FC, useEffect, useState, useRef } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, data }) => {
    const [typedUser, setTypedUser] = useState("");
    const [typedRepoCount, setTypedRepoCount] = useState("");
    const [typedActivity, setTypedActivity] = useState("");

    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            

            const event = data.events.totalEvents || 0;
            const Count = data?.repos?.total_repos;

            setTypedUser("");
            setTypedRepoCount("");
            setTypedActivity("");

            let userTimeout: NodeJS.Timeout;
            let repoTimeout: NodeJS.Timeout;
            let activityTimeout: NodeJS.Timeout;
            let autoCloseTimeout: NodeJS.Timeout;

            if (data?.user?.name) {
                const user = `user : ${data.user.name}`;
                userTimeout = setTimeout(() => {
                    let currentUser = "";
                    user.split("").forEach((char: string, index: number) => {
                        setTimeout(() => {
                            currentUser += char;
                            setTypedUser(currentUser);
                        }, index * 100);
                    });
                }, 500);
            }

            const repoCount = `repo count : ${Count}`;
            repoTimeout = setTimeout(() => {
                let currentRepoCount = "";
                repoCount.split("").forEach((char, index) => {
                    setTimeout(() => {
                        currentRepoCount += char;
                        setTypedRepoCount(currentRepoCount);
                    }, index * 100);
                });
            }, 1000 + (data?.user?.name?.length || 0) * 100);

            const activity = `activity in last 90 days : ${event}`;
            activityTimeout = setTimeout(() => {
                let currentActivity = "";
                activity.split("").forEach((char, index) => {
                    setTimeout(() => {
                        currentActivity += char;
                        setTypedActivity(currentActivity);
                    }, index * 100);
                });
            }, 1500 + (data?.user?.name?.length || 0) * 100 + (data?.repos?.total_repos?.toString()?.length || 0) * 100);

            autoCloseTimeout = setTimeout(() => {
                onCloseRef.current();
            }, 6700);

            return () => {
                clearTimeout(userTimeout);
                clearTimeout(repoTimeout);
                clearTimeout(activityTimeout);
                clearTimeout(autoCloseTimeout);
            };
        }
    }, [isOpen, data]);

    if (!isOpen) return null;

    return (
        <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80">
            <div className="bg-black w-[50%]  md:w-[60%]  sm:w-[75%] flex items-center font-Cardo justify-center rounded-lg p-4 relative">
                <button
                    className="absolute top-2 right-2 z-10 text-white"
                    onClick={onClose}
                >
                    <div className="w-3 h-3 rounded-full bg-red-700"></div>
                </button>
                <div className="text-white w-full z-9 absolute top-2 left-2">
                    <h2 className="text-sm">Terminal</h2>
                    <hr className="h-px my-1 bg-slate-200 border-0 dark:bg-gray-700 w-[97%] text-center"></hr>
                </div>
                <div className="flex flex-col contents-start h-full w-full text-sm">
                    <div className="text-white flex flex-row justify-start mt-6 ">
                        <p className="text-yellow-300 -ml-2"> git&nbsp;</p><h3>fetch {data.userID}</h3>
                        <div className="bg-white w-2 h-2 animate-pulse rounded-full mt-2 ml-2"></div>
                        <div className="bg-white w-2 h-2 animate-pulse rounded-full mt-2 ml-1"></div>
                        <div className="bg-white w-2 h-2 animate-pulse rounded-full mt-2 ml-1"></div>
                    </div>
                    <div className="text-white -ml-2 mt-1">
                        <p>{typedUser}</p>
                        <p>{typedRepoCount}</p>
                        <p>{typedActivity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

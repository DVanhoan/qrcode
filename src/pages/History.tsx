import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { getAttendanceList, clearAttendance, exportCSV } from '../utils/storage';

const History: React.FC = () => {
    const [list, setList] = useState<{ mssv: string; time: string }[]>([]);

    useEffect(() => {
        setList(getAttendanceList());
    }, []);

    const handleReset = () => {
        clearAttendance();
        setList([]);
    };

    const handleExport = () => {
        exportCSV();
    };

    return (
        <IonPage className="flex flex-col h-full">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lịch sử điểm danh</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flex flex-row justify-center gap-4 my-4">
                    <IonButton color="primary" onClick={handleExport}>Xuất CSV</IonButton>
                    <IonButton color="danger" onClick={handleReset}>Reset</IonButton>
                </div>
                <IonList>
                    {list.length === 0 && <IonItem><IonLabel>Chưa có dữ liệu.</IonLabel></IonItem>}
                    {list.map((item, idx) => (
                        <IonItem key={idx}>
                            <IonLabel>{item.mssv}</IonLabel>
                            <IonLabel slot="end">{item.time}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default History;

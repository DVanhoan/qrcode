import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { QRCodeSVG } from 'qrcode.react';

const GenerateQR: React.FC = () => {
    const [mssv, setMssv] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = () => {
        if (!mssv.trim()) {
            setError('Vui lòng nhập MSSV.');
            setShowQR(false);
            return;
        }
        setError('');
        setShowQR(true);
    };

    return (
        <IonPage className="flex flex-col h-full">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tạo QR</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center my-4">
                    <IonInput
                        label="MSSV"
                        placeholder="Nhập MSSV..."
                        value={mssv}
                        onIonChange={e => setMssv(e.detail.value!)}
                        className="mb-4 w-64"
                    />
                    <IonButton onClick={handleGenerate}>Tạo QR</IonButton>
                    {error && <IonText color="danger">{error}</IonText>}
                </div>
                {showQR && (
                    <div className="flex flex-col items-center mt-6">
                        <QRCodeSVG value={`ATTEND:${mssv}`} size={220} />
                        <IonText className="mt-2">ATTEND:{mssv}</IonText>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default GenerateQR;

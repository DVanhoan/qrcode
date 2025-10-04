import React, { useRef, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { QRCodeSVG } from 'qrcode.react';

const GenerateQR: React.FC = () => {
    const [mssv, setMssv] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLIonInputElement>(null);

    const handleGenerate = () => {
        let value = mssv;
        if (inputRef.current && typeof inputRef.current.value === 'string') {
            value = inputRef.current.value;
        }
        if (!value || value.trim() === '') {
            setError('Vui lòng nhập MSSV.');
            setShowQR(false);
            return;
        }
        setMssv(value);
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
                <div className="w-full flex flex-row items-center my-4">
                    <IonInput
                        ref={inputRef}
                        label="MSSV"
                        placeholder="MSSV..."
                        value={mssv}
                        onIonChange={e => {
                            setMssv(e.detail.value!);
                            if (error) setError('');
                        }}
                        className="mb-4 w-40 px-2"
                    />
                    <IonButton onClick={handleGenerate}>Tạo</IonButton>
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

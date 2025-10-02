import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { qrCode, scanOutline, listOutline } from 'ionicons/icons';
import GenerateQR from './pages/GenerateQR';
import History from './pages/History';
import QRScanner from './pages/QRScanner';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/GenerateQR">
            <GenerateQR />
          </Route>
          <Route exact path="/QRScanner">
            <QRScanner />
          </Route>
          <Route exact path="/History">
            <History />
          </Route>
          <Route exact path="/">
            <Redirect to="/GenerateQR" />
          </Route>
        </IonRouterOutlet>


        <IonTabBar slot="bottom">
          <IonTabButton tab="GenerateQR" href="/GenerateQR">
            <IonIcon aria-hidden="true" icon={qrCode} />
            <IonLabel>Generate QR</IonLabel>
          </IonTabButton>
          <IonTabButton tab="QRScanner" href="/QRScanner">
            <IonIcon aria-hidden="true" icon={scanOutline} />
            <IonLabel>QR Scanner</IonLabel>
          </IonTabButton>
          <IonTabButton tab="History" href="/History">
            <IonIcon aria-hidden="true" icon={listOutline} />
            <IonLabel>History</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

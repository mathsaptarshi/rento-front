import * as appActions from './appActions/appActions';
import * as authActions from './appActions/authActions';
import * as uploadActions from './appActions/uploadActions';
import * as cabActions from './appActions/cabActions';
import * as tariffAction from './appActions/tariffActions';
import * as bookingAction from './appActions/bookingAction';
import * as adminAction from './appActions/adminActions';
import * as crewAction from './appActions/crewActions'

export const ActionCreators = Object.assign({},
  {
    ...appActions,
    ...authActions,
    ...cabActions,
    ...tariffAction,
    ...bookingAction,
    ...adminAction,
    ...crewAction
  });
export const UpLoadActionCreators = Object.assign({},
  uploadActions);

// export const BookingActionCreators = Object.assign({},
//   bookingAction);
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import moment from 'moment';

export const showTime = (deadline: string) => {
  return moment(deadline).format('DD/M/YYYY HH:mm');
};
export const isDeadline = (deadline: string, completed: boolean) => {
  return (
    !completed &&
    moment(deadline).diff(moment(), 'minutes') <= 60 &&
    moment(deadline).isAfter(moment().format())
  );
};
export const showTimeLeft = (deadline: string, completed: boolean) => {
  if (isDeadline(deadline, completed)) return moment(deadline).fromNow();
};
export const isTimeOut = (deadline: string, completed: boolean) =>
  !completed && moment(deadline).isBefore(moment());

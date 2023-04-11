import dayjs from "dayjs";

const initialDay = dayjs();

export const generateGraduationTerms = () => {
    const graduationList = [];
    const year = initialDay.year();
    for (let x = 0; x < 5; x++) {
        graduationList.push({ display: `Fall ${year + x}`, value: `Fall-${year + x}` });
        graduationList.push({ display: `Spring ${year + x}`, value: `Spring-${year + x}` });
    }

    if (initialDay.month() > 1 && initialDay.month() < 6) {
        graduationList.splice(0, 1);
    } else if (initialDay.month() > 6 && initialDay.month() < 12) {
        graduationList.splice(1, 1);
    }

    return graduationList;
};

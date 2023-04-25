import dayjs from "dayjs";

const initialDay = dayjs();

/**
 * Generates list of graduation terms 5 years out for player to choose from in signup
 * @returns - graduation list
 */
export const generateGraduationTerms = () => {
    const graduationList = [];
    const year = initialDay.year();
    for (let x = 0; x < 5; x++) {
        graduationList.push({ display: `Fall ${year + x}`, value: `Fall-${year + x}` });
        graduationList.push({ display: `Spring ${year + x}`, value: `Spring-${year + x}` });
    }

    // will remove current year fall term if its within range
    if (initialDay.month() > 1 && initialDay.month() < 6) {
        graduationList.splice(0, 1);
        // will remove both fall and spring of current year if within range
    } else if (initialDay.month() > 6 && initialDay.month() < 12) {
        graduationList.splice(0, 2);
    }

    return graduationList;
};

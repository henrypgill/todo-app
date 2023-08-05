interface DatePickerProps {
    date: DatePickerDate;
    setDate(date: DatePickerDate): void;
}

type MonthsOfYear =
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Day = number;
type Hours =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
type Minutes = 0 | 15 | 30 | 45;
export type DatePickerDate = [Month, Day, Hours, Minutes];

export function DatePicker({ date, setDate }: DatePickerProps): JSX.Element {
    const monthsOfYear: MonthsOfYear[] = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];

    const monthsAndDays = {
        january: 31,
        february: 28,
        march: 31,
        april: 30,
        may: 31,
        june: 30,
        july: 31,
        august: 31,
        september: 30,
        october: 31,
        november: 30,
        december: 31,
    };
    const hours = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
    ];
    const minutes = [0, 15, 30, 45];

    const monthOptions: JSX.Element[] = monthsOfYear.map((month) => {
        return (
            <option key={month} value={monthsOfYear.indexOf(month) + 1}>
                {month}
            </option>
        );
    });
    const dayOptions: JSX.Element[] = [];
    for (let i = 1; i <= monthsAndDays[monthsOfYear[date[0] - 1]]; i++) {
        dayOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const hourOptions: JSX.Element[] = hours.map((hour) => {
        return (
            <option key={hour} value={hour}>
                {hour}
            </option>
        );
    });
    const minuteOptions: JSX.Element[] = minutes.map((minute) => {
        return (
            <option key={minute} value={minute}>
                {minute}
            </option>
        );
    });

    function handleUpdateDate(
        field: "month" | "day" | "hours" | "minutes",
        fieldValue: Month | Day | Hours | Minutes
    ) {
        const currentDate = date;
        switch (field) {
            case "month":
                setDate([
                    fieldValue as Month,
                    currentDate[1],
                    currentDate[2],
                    currentDate[3],
                ]);
                break;
            case "day":
                setDate([
                    currentDate[0],
                    fieldValue as Day,
                    currentDate[2],
                    currentDate[3],
                ]);
                break;
            case "hours":
                setDate([
                    currentDate[0],
                    currentDate[1],
                    fieldValue as Hours,
                    currentDate[3],
                ]);
                break;
            case "minutes":
                setDate([
                    currentDate[0],
                    currentDate[1],
                    currentDate[2],
                    fieldValue as Minutes,
                ]);
                break;
        }
    }

    return (
        <>
            <h3 className="new-todo-date-label">Date:</h3>
            <select
                className="new-todo-month-input"
                value={date[0]}
                onChange={(e) =>
                    handleUpdateDate("month", parseInt(e.target.value) as Month)
                }
            >
                {monthOptions}
            </select>
            <select
                className="new-todo-day-input"
                value={date[1]}
                onChange={(e) =>
                    handleUpdateDate("day", parseInt(e.target.value) as Day)
                }
            >
                {dayOptions}
            </select>
            <h3 className="new-todo-time-label">Time:</h3>
            <select
                className="new-todo-hour-input"
                value={date[2]}
                onChange={(e) =>
                    handleUpdateDate("hours", parseInt(e.target.value) as Hours)
                }
            >
                {hourOptions}
            </select>
            <select
                className="new-todo-minute-input"
                value={date[3]}
                onChange={(e) =>
                    handleUpdateDate(
                        "minutes",
                        parseInt(e.target.value) as Minutes
                    )
                }
            >
                {minuteOptions}
            </select>
        </>
    );
}

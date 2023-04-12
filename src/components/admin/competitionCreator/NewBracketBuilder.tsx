import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Field, FieldArray, Form, Formik } from "formik";
import { LeagueStore } from "../../../models/contests/LeagueStore";
import { NewLeague } from "../competitions/League";
import { SubForm } from "../competitions/SubForm";
import { LeagueModel } from "../../../models/contests/LeagueModel";

export const NewBracketBuilder = observer(() => {
    const [store] = useState(() => new LeagueStore());

    return (
        // <>
        //     <div>
        //         {store.leagues.map((league, index) => (
        //             <NewLeague
        //                 key={index}
        //                 league={league}
        //                 removeLeague={store.removeLeague}
        //                 index={index}
        //             />
        //         ))}
        //     </div>
        //     <button onClick={store.pushLeague}>Push League</button>
        // </>
        <Formik
            initialValues={{
                song: "",
                leagues: [new LeagueModel()],
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            enableReinitialize>
            {(formik) => (
                <Form>
                    <Field type="text" name="song" />
                    <FieldArray name="leagues">
                        {({ push }) => (
                            <>
                                {formik.values.leagues.map((league, lindex) => (
                                    <SubForm key={lindex} index={lindex} league={league} />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        push(new LeagueModel());
                                    }}>
                                    Push League
                                </button>
                                {/* <button onClick={() => push({ address: "", zipcode: "" })}>h</button> */}
                            </>
                        )}
                    </FieldArray>

                    <button type="submit">Create</button>
                </Form>
            )}
        </Formik>
    );
});

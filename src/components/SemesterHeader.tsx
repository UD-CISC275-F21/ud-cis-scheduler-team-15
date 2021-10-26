import React, { useState } from "react";

export function SemesterHeader(): JSX.Element{
    return(
        <table>
            <th>
                <td>
                    Course Number
                </td>
                <td>
                    Course Name
                </td>
                <td>
                    Credits
                </td>
            </th>
        </table>
    );
}
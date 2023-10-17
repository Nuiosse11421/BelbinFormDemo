$(document).ready(function () {
    $('#submitButton').on('click', function () {
        const selectTimestamp = $('#timestampDropdown').val(); 

        $.ajax({
            type: 'POST',
            url: '/history/api/answer-history',
            data: { timestamp: selectTimestamp },
            success: function (response) {
                if (response) {
                    Object.keys(response.asScore).forEach(propName => {
                        const scoreValue = response.asScore[propName];
                        const $td = $(`#${propName}`)
                        $td.text(scoreValue === 0 ? '': scoreValue)
                        

                    })
                    const roleContainer = $('.role-container table tbody')
                    const roleScores = Object.entries(response.asRole).sort((a, b) => b[1] - a[1])
                    roleContainer.empty()

                    roleScores.forEach(([roleName, score]) => {
                        roleContainer.append(`
                            <tr>
                                <td>${roleName}</td>
                                <td>${score}</td>
                            </tr>
                        `)
                    })
                } else {

                    console.error('Empty or undefined response from the server')
                }
            },
            error: function (err) {
                console.error("Error in ajax response:" + err.message)
            },
        })
    });
});
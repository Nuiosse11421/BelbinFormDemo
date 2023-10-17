import User from '../models/user'

export const renderScoreTable = async(req,res)=>{
    try{
        const userID = req.session.userId
        const user = await User.findById(userID)
        const selectedTimestamp = req.query.timstamp
        const selectedHistory = user.answer.historyScore.find(
            (history)=> history.timestamp.toString() === selectedTimestamp
        )
        if(!selectedHistory){
            return res.status(404).send('Timestamp not found')
        }
        const score = selectedHistory.Score
        const table = `
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Question</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(scores)
                        .map(([key, value]) => {
                            const question = key.slice(0, 1);
                            const index = key.slice(1);
                            return `
                                <tr>
                                    <td>${question}${index}-${question}${Number(index) + 1}</td>
                                    <td>Question ${question}${Number(index) + 1}</td>
                                    <td>${value}</td>
                                </tr>
                            `;
                        })
                        .join('')}
                </tbody>
            </table>
        `;
    }catch(e){
        console.error(e.message || e )
        res.status(500).send('Internal Server Error')
    }
}
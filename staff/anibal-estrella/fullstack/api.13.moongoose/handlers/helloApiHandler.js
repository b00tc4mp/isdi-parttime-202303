module.exports = (req, res) => {

    res.send(`hello api!`).then(() => res.status(200).send())

    return
}
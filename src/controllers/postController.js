const Post = require("../entity/Post");

module.exports = (conn) => {
    return {
        async postsList(req, res) {
            try {
                const postRepository = conn.getRepository(Post);
                const posts = await postRepository.find();
                res.json(posts);
            } catch (err) {
                res.json({message: err});
            }
        },
        async postSlug(req, res) {
            try {
                const postRepository = conn.getRepository(Post);
                const post = await postRepository.findOne({slug: req.body.slug});
                res.json(post);
            } catch (err) {
                res.json({message: err});
            }
        },
        async postCreate(req, res) {
            try {
                const postRepository = conn.getRepository(Post);
                const post = await postRepository.create({
                    title: req.body.title, 
                    slug: req.body.slug, 
                    description: req.body.description,
                    likes: req.body.likes,
                    authorId: req.user,
                    price: req.body.price
                });
                await postRepository.save(post);
                res.json(post);
            } catch (err) {
                res.json({message: err});
            }
        }
    }
}
const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const methodOverride = require('method-override');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt'); 
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const passportConfig = require('../passportConfig');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(passport.initialize());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

router.post('/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, content, user } = req.body;
    const imageBuffer = req.file.filename; 
    const newBlog = new Blog({ title, content, image: imageBuffer, user });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('blogs comments');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); 
    res.json(blogs); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const image = req.file.filename; 

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'diana', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ message: 'You accessed a protected route!', user: req.user });
});

router.get('/current-user', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogs = req.params.id;
    const blog = await Blog.findById(blogs);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.put('/blogs/:id', async (req, res) => {
  const { title, content, image, user} = req.body; 

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content, image, user }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' }); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

router.post('/blogs/:blogId/comments', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const blogId = req.params.blogId;  
  const { content } = req.body;
  const userId = req.user._id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const newComment = new Comment({ content, user: userId, blog: blogId });
    await newComment.save();
  
    blog.comments.push(newComment._id);
    await blog.save();
 
    const populatedComment = await Comment.findById(newComment._id).populate('user');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/blogs/:blogId/comments', async (req, res) => {  const blogId = req.params.blogId;
  try {
     const comments = await Comment.find({ blog: blogId }).populate('user');
    res.json(comments);  } catch (error) {
    res.status(500).json({ error: error.message });  }
});

router.put('/comments/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/comments/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const query = req.query.q; 
    let blogs;

    if (query) {
      blogs = await Blog.find({ $text: { $search: query } });
    } else {
      blogs = await Blog.find();
    }

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

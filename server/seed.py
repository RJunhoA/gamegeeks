from random import choice as rc, randint
from faker import Faker
from app import app
from models import db, User, Post, Like

with app.app_context():
    print("Deleting data...")
    User.query.delete()
    Post.query.delete()
    Like.query.delete()


    u1 = User(username='Noooooodles', _password='1234', image='https://preview.redd.it/gmk8e118igg71.png?auto=webp&s=b209cbacff4584e535904a92d92cbbf168099d1d', about='Ex CSGO pro turn content creator!')
    u2 = User(username='SecretAsianMan', _password='1234', image='https://www.kotaku.com.au/wp-content/uploads/sites/3/2015/05/15/1252650027284060518.jpg', about="Hey it's SAM. Like long walks on the beach and pwning n00bs!")
    u3 = User(username='Derelicte', _password='1234', image='https://www.indiependent.co.uk/wp-content/uploads/2021/09/Zoolander.jpg', about='Let me show you Derelicte.')

    p1 = Post(content='Look at this montage I made for ZBD! https://www.youtube.com/watch?v=44dQV1rLKv4')
    p2 = Post(content='Going live soon for CSGO Paris major watch party! twitch.tv/noooooodles')
    p3 = Post(content='Just finished playing the new Resident Evil game, and it was intense! Has anyone else played it yet? #ResidentEvil #GamingCommunity')
    p4 = Post(content='Just completed my first speedrun of Super Mario Bros.! Shoutout to all the speedrunners out there who inspired me! #Speedrun #GamingAchievement')
    p5 = Post(content="Just tried out this new indie game and it's surprisingly good! Show some love for indie games! #IndieGames #GamingCommunity")
    p6 = Post(content="I'm so excited for the new Legend of Zelda game coming out! Can't wait to explore Hyrule again! #LegendOfZelda #GamingExcitement")
    p7 = Post(content="Had an amazing time competing in the gaming tournament last night! Didn't win, but it was a blast! #gamingcompetition #goodtimes")
    p8 = Post(content="Nothing like a good gaming session to destress after a long day at work! #gamingtherapy #relaxation")
    p9 = Post(content="Tried out virtual reality gaming for the first time today and it blew my mind! Have you guys tried it yet? #virtualrealitygaming #mindblowing")

    db.session.add_all([u1, u2, u3])
    db.session.add_all([p1, p7, p3, p2, p4, p8, p5, p6, p9])
    db.session.commit()

    l1 = Like(user_id=u1.id, post_id=p1.id)
    l2 = Like(user_id=u1.id, post_id=p2.id)
    l3 = Like(user_id=u1.id, post_id=p3.id)
    l4 = Like(user_id=u2.id, post_id=p4.id)
    l5 = Like(user_id=u2.id, post_id=p5.id)
    l6 = Like(user_id=u2.id, post_id=p6.id)
    l7 = Like(user_id=u3.id, post_id=p7.id)
    l8 = Like(user_id=u3.id, post_id=p8.id)
    l9 = Like(user_id=u3.id, post_id=p9.id)
    l10 = Like(user_id=u1.id, post_id=p4.id)
    l11 = Like(user_id=u1.id, post_id=p7.id)
    l12 = Like(user_id=u1.id, post_id=p5.id)

    db.session.add_all([l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12])
    db.session.commit()


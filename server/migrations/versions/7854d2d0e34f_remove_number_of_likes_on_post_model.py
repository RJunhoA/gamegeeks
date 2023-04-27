"""remove number of likes on Post model

Revision ID: 7854d2d0e34f
Revises: fadf54e61c8a
Create Date: 2023-04-27 16:24:14.001325

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7854d2d0e34f'
down_revision = 'fadf54e61c8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('number_of_likes')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_of_likes', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###

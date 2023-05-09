"""add about column to User

Revision ID: 727fba349bd3
Revises: 7854d2d0e34f
Create Date: 2023-05-03 14:49:39.307999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '727fba349bd3'
down_revision = '7854d2d0e34f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('about', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('about')

    # ### end Alembic commands ###
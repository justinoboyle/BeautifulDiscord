from setuptools import setup, find_packages


with open('requirements.txt') as f:
    requirements = f.read().splitlines()

with open('README.md') as f:
    readme = f.read()


setup(
    name='MyDiscord',
    author='justinoboyle',
    url='https://github.com/justinoboyle/MyDiscord',
    version='0.3.0',
    license='MIT',
    description='Adds custom CSS and JavaScript support to Discord. (Fork of BeautifulDiscord)',
    long_description=readme,
    packages=find_packages(),
    install_requires=requirements,
    include_package_data=True,
    entry_points={'console_scripts': ['mydiscord=mydiscord.app:main']}
)

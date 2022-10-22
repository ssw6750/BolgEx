import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { getAllPostIds, getPostData, getSortedPostsDate } from '../../lib/post'
import postStyles from '../../styles/Post.module.css'

const Post = ({postData}: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
  return (
    <div className={postStyles.container}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1>{postData.title}</h1>
            <div>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}}></div>
        </article>
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    // [{params: {id: 'pre-rendering'} }, {params: {id: 'pre-rendering'} }]
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id as string)
    return{
        props: {
            postData
        }
    }
}